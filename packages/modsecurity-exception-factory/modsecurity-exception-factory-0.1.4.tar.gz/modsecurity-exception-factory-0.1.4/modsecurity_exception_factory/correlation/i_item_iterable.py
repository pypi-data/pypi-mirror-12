#-*- coding: utf-8 -*-
#
# Created on Jan 15, 2013
#
# @author: Younes JAAIDI
#
# $Id: d6e9cd553b4bb358ee8ceeaff36d2320ae86efe8 $
#

from abc import abstractmethod

class IItemIterable:

    @abstractmethod
    def __len__(self):
        raise NotImplementedError()

    @abstractmethod
    def mostFrequentVariableAndValue(self, variableNameList):
        raise NotImplementedError()

    @abstractmethod
    def distinct(self):
        raise NotImplementedError()

    @abstractmethod
    def filterByVariable(self, variableName, variableNameSet, negate = False):
        raise NotImplementedError()
