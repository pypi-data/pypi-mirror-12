#-*- coding: utf-8 -*-
#
# Created on Jan 3, 2013
#
# @author: Younes JAAIDI
#
# $Id: 555e322ee02c868b0481494e632a3eb95ad61b19 $
#

from contracts import new_contract
from modsecurity_exception_factory.modsecurity_audit_entry import ModsecurityAuditEntry
from modsecurity_exception_factory.modsecurity_audit_log_parser.i_modsecurity_audit_log_section_parser import \
    IModsecurityAuditLogSectionParser
from synthetic.decorators import synthesizeMember, synthesizeConstructor

new_contract('IModsecurityAuditLogSectionParser', IModsecurityAuditLogSectionParser)
new_contract('ModsecurityAuditEntry', ModsecurityAuditEntry)

@synthesizeMember('currentLineString', contract = 'unicode|None')
@synthesizeMember('currentSectionLineIndex', default = 0, contract = 'int|None')
@synthesizeMember('currentSectionParser', contract = 'IModsecurityAuditLogSectionParser|None')
@synthesizeMember('modsecurityAuditEntry', contract = 'ModsecurityAuditEntry|None')
@synthesizeMember('reachedEntryStart', contract = 'bool|None')
@synthesizeConstructor()
class ModsecurityAuditLogParserState:
    def incrementCurrentSectionLineIndex(self):
        self._currentSectionLineIndex += 1
