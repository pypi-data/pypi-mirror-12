# -*- coding: utf-8 -*-
u"""
Created on 2015-7-31

@author: cheng.li
"""

try:
    import Queue as queue
except ImportError:
    import queue
import time
import os
import datetime as dt
from enum import IntEnum
from enum import unique
from PyFin.Env import Settings
from AlgoTrading.Data.DataProviders import HistoricalCSVDataHandler
from AlgoTrading.Data.DataProviders import DataYesMarketDataHandler
try:
    from AlgoTrading.Data.DataProviders import DXDataCenter
except ImportError:
    pass
from AlgoTrading.Data.DataProviders import YaHooDataProvider
from AlgoTrading.Execution.Execution import SimulatedExecutionHandler
from AlgoTrading.Execution.OrderBook import OrderBook
from AlgoTrading.Execution.FilledBook import FilledBook
from AlgoTrading.Portfolio.Portfolio import Portfolio
from AlgoTrading.Assets import XSHGStock
from AlgoTrading.Assets import IndexFutures
from AlgoTrading.Utilities import CustomLogger


def setAssetsConfig(symbolList):
    res = {}
    for s in symbolList:
        if s[0].isalpha():
            res[s] = IndexFutures
        else:
            res[s] = XSHGStock
    return res


class Backtest(object):

    def __init__(self,
                 initial_capital,
                 heartbeat,
                 data_handler,
                 execution_handler,
                 portfolio,
                 strategy,
                 logger,
                 benchmark=None,
                 refreshRate=1,
                 plot=False):
        self.initialCapital = initial_capital
        self.heartbeat = heartbeat
        self.dataHandler = data_handler
        self.executionHanlderCls = execution_handler
        self.portfolioCls = portfolio
        self.strategyCls = strategy
        self.symbolList = self.dataHandler.symbolList
        self.assets = setAssetsConfig(self.symbolList)
        self.events = queue.Queue()
        self.dataHandler.setEvents(self.events)
        self.signals = 0
        self.orders = 0
        self.fills = 0
        self.num_strats = 1
        self.benchmark = benchmark
        self.refreshRate = refreshRate
        self.counter = 0
        self.plot = plot
        self.logger = logger

        self._generateTradingInstance()

    def _generateTradingInstance(self):
        Settings.defaultSymbolList = self.symbolList
        self.strategy = self.strategyCls()
        self.strategy.events = self.events
        self.strategy.bars = self.dataHandler
        self.strategy.symbolList = self.symbolList
        self.strategy.logger = self.logger
        self.portfolio = self.portfolioCls(self.dataHandler,
                                           self.events,
                                           self.dataHandler.getStartDate(),
                                           self.assets,
                                           self.initialCapital,
                                           self.benchmark)
        self.executionHanlder = self.executionHanlderCls(self.events, self.dataHandler, self.portfolio, self.logger)
        self.orderBook = OrderBook()
        self.filledBook = FilledBook()
        self.portfolio.filledBook = self.filledBook
        self.strategy._port = self.portfolio
        self.strategy._posBook = self.portfolio.positionsBook

    def _runBacktest(self):

        i = 0
        while True:
            i += 1
            if self.dataHandler.continueBacktest:
                self.strategy.symbolList = self.dataHandler.updateBars()
            else:
                break

            while True:
                try:
                    event = self.events.get(False)
                except queue.Empty:
                    break
                if event is not None:
                    if event.type == 'MARKET':
                        self.counter += 1
                        self.strategy._updateSubscribing()
                        if self.counter % self.refreshRate == 0:
                            self.strategy._handle_data()
                        self.portfolio.updateTimeindex()
                    elif event.type == 'SIGNAL':
                        self.signals += 1
                        self.portfolio.updateSignal(event)
                    elif event.type == 'ORDER':
                        self.orders += 1
                        event.assetType = self.assets[event.symbol]
                        self.orderBook.updateFromOrderEvent(event)
                        fill_event = self.executionHanlder.executeOrder(event)
                        self.fills += 1
                        if fill_event:
                            self.orderBook.updateFromFillEvent(fill_event)
                            self.portfolio.updateFill(fill_event)

            time.sleep(self.heartbeat)

    def _outputPerformance(self):
        self.logger.info("Orders : {0:d}".format(self.orders))
        self.logger.info("Fills  : {0:d}".format(self.fills))

        self.portfolio.createEquityCurveDataframe()
        perf_metric, perf_df, rollingRisk, aggregated_positions, transactions, turnover_rate = self.portfolio.outputSummaryStats(self.portfolio.equityCurve, self.plot)
        return self.portfolio.equityCurve, self.orderBook.view(), self.filledBook.view(), perf_metric, perf_df, rollingRisk, aggregated_positions, transactions, turnover_rate

    def simulateTrading(self):
        self.logger.info("Start backtesting...")
        self.strategy._subscribe()
        self._runBacktest()
        self.logger.info("Backesting finished!")
        return self._outputPerformance()


@unique
class DataSource(IntEnum):
    CSV = 0
    DataYes = 1
    DXDataCenter = 2
    YAHOO = 3


def strategyRunner(userStrategy,
                   initialCapital=100000,
                   symbolList=['600000.XSHG'],
                   startDate=dt.datetime(2015, 9, 1),
                   endDate=dt.datetime(2015, 9, 15),
                   dataSource=DataSource.DXDataCenter,
                   benchmark=None,
                   refreshRate=1,
                   saveFile=False,
                   plot=False,
                   logLevel='info',
                   **kwargs):

    logger = CustomLogger(logLevel)

    if dataSource == DataSource.CSV:
        dataHandler = HistoricalCSVDataHandler(csvDir=kwargs['csvDir'],
                                               symbolList=symbolList,
                                               logger=logger)
    elif dataSource == DataSource.DataYes:
        try:
            token = kwargs['token']
        except KeyError:
            token = None
        dataHandler = DataYesMarketDataHandler(token=token,
                                               symbolList=symbolList,
                                               startDate=startDate,
                                               endDate=endDate,
                                               benchmark=benchmark,
                                               logger=logger)
    elif dataSource == DataSource.DXDataCenter:
        dataHandler = DXDataCenter(symbolList=symbolList,
                                   startDate=startDate,
                                   endDate=endDate,
                                   freq=kwargs['freq'],
                                   benchmark=benchmark,
                                   logger=logger)
    elif dataSource == DataSource.YAHOO:
        dataHandler = YaHooDataProvider(symbolList=symbolList,
                                        startDate=startDate,
                                        endDate=endDate,
                                        logger=logger)

    backtest = Backtest(initialCapital,
                        0.0,
                        dataHandler,
                        SimulatedExecutionHandler,
                        Portfolio,
                        userStrategy,
                        logger,
                        benchmark,
                        refreshRate,
                        plot=plot)

    equityCurve, orderBook, filledBook, perf_metric, perf_df, rollingRisk, aggregated_positions, transactions, turnover_rate = backtest.simulateTrading()

    # save to a excel file
    if saveFile:
        if not os.path.isdir('performance/'):
            os.mkdir('performance')
        logger.info("Strategy performance is now saving to local files...")
        perf_metric.to_csv('performance/perf_metrics.csv', float_format='%.4f')
        perf_df.to_csv('performance/perf_series.csv', float_format='%.4f')
        rollingRisk.to_csv('performance/rollingRisk.csv', float_format='%.4f')
        equityCurve.to_csv('performance/equity_curve.csv', float_format='%.4f')
        orderBook.to_csv('performance/order_book.csv', float_format='%.4f')
        filledBook.to_csv('performance/filled_book.csv', float_format='%.4f')
        aggregated_positions.to_csv('performance/aggregated_positions.csv', float_format='%.4f')
        turnover_rate.to_csv('performance/turnover_rate.csv', float_format='%.4f')
        transactions.to_csv('performance/transactions.csv', float_format='%.4f')
        logger.info("Performance saving is finished!")

    return {'equity_curve': equityCurve,
            'order_book': orderBook,
            'filled_book': filledBook,
            'perf_metric': perf_metric,
            'perf_series': perf_df,
            'aggregated_positions': aggregated_positions,
            'transactions': transactions,
            'turnover_rate': turnover_rate}
