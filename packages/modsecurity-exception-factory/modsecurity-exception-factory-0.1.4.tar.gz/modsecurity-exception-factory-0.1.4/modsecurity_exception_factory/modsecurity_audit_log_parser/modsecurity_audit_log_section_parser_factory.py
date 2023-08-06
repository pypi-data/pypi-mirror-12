#-*- coding: utf-8 -*-
#
# Created on Jan 3, 2013
#
# @author: Younes JAAIDI
#
# $Id: 68b31815ea5f0dfcb8e57fa888c2d055d91326f1 $
#

from .modsecurity_audit_log_section_parser_a import ModsecurityAuditLogSectionParserA
from .modsecurity_audit_log_section_parser_b import ModsecurityAuditLogSectionParserB
from .modsecurity_audit_log_section_parser_h import ModsecurityAuditLogSectionParserH
from .modsecurity_audit_log_section_parser_unknown import ModsecurityAuditLogSectionParserUnknown
from contracts import contract

class ModsecurityAuditEntrySectionParserFactory:
    
    def __init__(self):
        self._sectionParserDefault = ModsecurityAuditLogSectionParserUnknown()
        self._sectionParserDict = {u'A': ModsecurityAuditLogSectionParserA(),
                                   u'B': ModsecurityAuditLogSectionParserB(),
                                   u'H': ModsecurityAuditLogSectionParserH()}
    
    @contract
    def sectionParser(self, strSectionType = None):
        """If 'strSectionType' is None, this will return the default parser.
    :type strSectionType: unicode|None
"""
        return self._sectionParserDict.get(strSectionType, self._sectionParserDefault)
