# -*- coding: utf-8 -*-

from keystone.strategy import KSStrategy, KSStrategyRunner
from keystone.sources import KSCsvSource
from keystone.performance.analyzer import KSDefaultAnalyzer

import sys
import pandas as pd
from datetime import datetime, timedelta

class MyStrategy(KSStrategy):
    def __init__(self):
        self.cash = 100000

    def onData(self, data, context, action):
        #print context.universe._KSUniverse__price
        #print data.securities()
        print u"在onData中。"
        securities = data.securities()
        print securities
        latestPrice = data.query([], 'price')
        print latestPrice
        print data.time()

        print latestPrice
        print context.history.queryN(3,['002035', '002010','002210'], 'price')
        print context.history.query(data.time()-timedelta(3), data.time(),['002035', '002010','002210'], 'price')
        print context.portfolio.cash()
        print context.portfolio.securities()

        if not context.portfolio.hasPosition('002035'):
            orderid = action.order('002035',100)
            #print "orderid: " + str(orderid)
            order = action.getOrder(orderid)
            #print "order is:"
            #print order
        else:
            orderid = action.orderValue('002035',0)
            #print "orderid: " + str(orderid)
            order = action.getOrder(orderid)
            #print "order is:"
            #print order

        if context.portfolio.hasPosition('002035'):
            print context.portfolio.getPosition('002035')
        print context.portfolio.value()
        print context.portfolio.cash()
        print context.analyzers[0].returns
        print context.analyzers[0].value()
        print "========================="
        c=raw_input()

    def onOrderEvent(self, orderEvent):
        print "recieve order update info"
        #print orderEvent

if __name__ == '__main__':
    c = KSCsvSource('../../../data/market.csv', 'dt', '%Y-%m-%d %H:%M:%S')
    c.tagAsPriceData('sid','price')
    c.setDelimiter(',')
    signal = KSCsvSource('../../../data/signal.csv', 'dt', '%Y-%m-%d %H:%M:%S')
    strategy = MyStrategy()
    analyzer = KSDefaultAnalyzer()

    runner = KSStrategyRunner()
    runner.setHistoryCapacity(10)
    runner.setCash(100000)
    runner.addSource(c)
    # runner.addSource(signal)
    runner.useStrategy(strategy)
    runner.brokerPolicy.turnOnInstantMatch()
    runner.attachAnalyzer(analyzer)
    runner.setStartTime(datetime.strptime("2014-05-05 00:00:00", "%Y-%m-%d %H:%M:%S"))
    runner.setEndTime(datetime.strptime("2014-05-08 00:00:00", "%Y-%m-%d %H:%M:%S"))
    runner.setStopPercentage(1.0)
    runner.run()
