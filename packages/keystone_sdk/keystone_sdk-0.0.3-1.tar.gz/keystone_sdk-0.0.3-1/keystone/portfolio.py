# -*- coding: utf-8 -*-

from keystone.api import keystone_class, api_method
from datetime import datetime
import numpy as np


class KSPosition(object):
    def __init__(self, security, quantity, price, commission, universe):
        self.__security = security
        self.__quantity = quantity
        self.__priceArray = [price]
        self.__quantityArray = [quantity]
        self.__commissionArray = [commission]
        self.__universe = universe
        self.__openAt = universe.time()
    
    def update(self, quantity, price, commission):
        self.__quantity += quantity
        self.__priceArray.append(price)
        self.__commissionArray.append(commission)
    
    def __str__(self):
        info = "security:\t" + str(self.__security) + "\n" + \
        "quantity:\t" + str(self.__quantity) +"\n" + \
        "value:\t" + str(self.value()) + "\n"
        return info
        
    
    def isShort(self):
        return self.__quantity < 0
    
    
    def costBasis(self):
        return np.mean(self.__priceArray)
    
    
    def avgCommission(self):
        return np.mean(self.__commissionArray)
    
    
    def security(self):
        return self.__security
    
    
    def quantity(self):
        return self.__quantity
    
    
    def value(self):
        price = self.__universe.getPrice(self.__security)
        assert price is not None
        assert not np.isnan(price)
        return self.__quantity * price
    
    
    def openAt(self):
        return self.__openAt
    

class KSPortfolio(object):
    '''
    portfolio
    
    cash - available cash
    '''
    def __init__(self, startingCash, universe):
        self.__startingCash = startingCash
        self.__cash = startingCash
        self.__universe = universe
        self.__positions = {}
    
    def update(self, security, quantity, price, commission):
        if security in self.__positions:
            self.__positions[security].update(quantity, price, commission)
            if self.__positions[security].quantity() == 0:
                self.__positions.pop(security)
        else:
            self.__positions[security] = KSPosition(security, quantity, price, commission, self.__universe)
        
        # TODO: 做空时计算方法要变
        self.__cash = self.__cash - (price * quantity) - commission
        
        assert self.__cash >= 0.0
    
    
    def startingCash(self):
        return self.__startingCash
        
    
    def cash(self):
        return self.__cash
    
    
    def securities(self):
        return self.__positions.keys()
    
    
    def hasPosition(self, security):
        return security in self.__positions
    
    
    def getPosition(self, security):
        if security in self.__positions:
            return self.__positions[security]
        else:
            raise KeyError(u"no such position for '" + unicode(security) + u"'.")
            
    
    def value(self):
        return self.__cash + np.sum([x.value() for x in self.__positions.values()])
    