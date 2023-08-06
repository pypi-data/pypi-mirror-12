#-*- coding: utf-8 -*-
#
# Created on Jan 30, 2013
#
# @author: Younes JAAIDI
#
# $Id: a8a5f174f4b9ebd6e25ed499f57eae1cf1a049da $
#

from modsecurity_exception_factory.modsecurity_audit_data_source.sql_base import \
    SQLBase
from sqlalchemy import Column, Integer, String
from sqlalchemy.types import Boolean

class SQLFilterCondition(SQLBase):
    __tablename__ = 'filter_condition'
    
    id = Column(Integer, primary_key = True)
    variableName = Column(String, index = True)
    variableValue = Column(String, index = True)
    negate = Column(Boolean, index = True)
