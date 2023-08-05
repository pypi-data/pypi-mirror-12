# -*- coding: utf-8 -*-

import pytest
import sys
import time
from test_base_class import TestBaseClass

aerospike = pytest.importorskip("aerospike")
try:
    from aerospike.exception import *
except:
    print "Please install aerospike python client."
    sys.exit(1)

class TestQueryRole(TestBaseClass):

    pytestmark = pytest.mark.skipif(
        TestBaseClass().get_hosts()[1] == None,
        reason="No user specified, may be not secured cluster.")

    def setup_method(self, method):

        """
        Setup method
        """
        hostlist, user, password = TestBaseClass().get_hosts()
        config = {
                "hosts": hostlist
                }
        self.client = aerospike.client(config).connect( user, password )
        try:
            self.client.admin_drop_role("usr-sys-admin")
        except:
            pass
        usr_sys_admin_privs =  [
            {"code": aerospike.PRIV_USER_ADMIN},
            {"code": aerospike.PRIV_SYS_ADMIN}]
        try:
            self.client.admin_drop_role("usr-sys-admin-test")
        except:
            pass
        self.client.admin_create_role("usr-sys-admin-test", usr_sys_admin_privs)

        self.delete_users = []
        time.sleep(1)

    def teardown_method(self, method):

        """
        Teardown method
        """

        policy = {}

        self.client.admin_drop_role("usr-sys-admin-test")
        self.client.close()

    def test_admin_query_role_no_parameters(self):
        """
        Query role with no parameters
        """
        with pytest.raises(TypeError) as typeError:
            self.client.admin_query_role()

        assert "Required argument 'role' (pos 1) not found" in typeError.value

    def test_admin_query_role_positive(self):
        """
            Query role positive
        """
        roles = self.client.admin_query_role("usr-sys-admin-test")
        assert roles == [{'code': 0, 'ns': '', 'set': ''}, {'code': 1, 'ns': '', 'set': ''}]

    def test_admin_query_role_positive_with_policy(self):
        """
            Query role positive policy
        """
        roles = self.client.admin_query_role("usr-sys-admin-test", {'timeout': 1000})
        assert roles == [{'code': 0, 'ns': '', 'set': ''}, {'code': 1, 'ns': '', 'set': ''}]

    def test_admin_query_role_incorrect_role_name(self):
        """
            Incorrect role name
        """
        try:
            self.client.admin_query_role("usr-sys-admin-test-non-existent", {'timeout': 1000})

        except InvalidRole as exception:
            assert exception.code == 70
            assert exception.msg == "AEROSPIKE_INVALID_ROLE"

    def test_admin_query_role_incorrect_role_type(self):
        """
            Incorrect role type
        """
        try:
            self.client.admin_query_role(None, {'timeout': 1000})

        except ParamError as exception:
            assert exception.code == -2
            assert exception.msg == "Role name should be a string"
