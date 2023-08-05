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

class TestSetPassword(TestBaseClass):

    pytestmark = pytest.mark.skipif(
        TestBaseClass().get_hosts()[1] == None,
        reason="No user specified, may be not secured cluster.")

    def setup_method(self, method):
        """
        Setup method
        """
        hostlist, user, password = TestBaseClass().get_hosts()
        config = {"hosts": hostlist}
        TestSetPassword.Me = self
        self.client = aerospike.client(config).connect(user, password)
        try:
            self.client.admin_drop_user("testsetpassworduser")
        except:
            pass
        self.client.admin_create_user( "testsetpassworduser", "aerospike", ["read"], {})

        self.delete_users = []

    def teardown_method(self, method):
        """
        Teardown method
        """

        self.client.admin_drop_user( "testsetpassworduser" )

        self.client.close()

    def test_set_password_without_any_parameters(self):

        with pytest.raises(TypeError) as typeError:
            status = self.client.admin_set_password()

        assert "Required argument 'user' (pos 1) not found" in typeError.value

    def test_set_password_with_proper_parameters(self):

        policy = {'timeout': 50}
        user = "testsetpassworduser"
        password = "newpassword"

        status = self.client.admin_set_password( user, password )

        assert status == 0

    def test_set_password_with_invalid_timeout_policy_value(self):

        policy = {'timeout': 0.1}
        user = "testsetpassworduser"
        password = "newpassword"

        try:
            status = self.client.admin_set_password( user, password, policy )

        except ParamError as exception:
            assert exception.code == -2
            assert exception.msg == "timeout is invalid"

    def test_set_password_with_proper_timeout_policy_value(self):

        policy = {'timeout': 50}
        user = "testsetpassworduser"
        password = "newpassword"

        status = self.client.admin_set_password( user, password, policy )

        assert status == 0

    def test_set_password_with_none_username(self):

        policy = {}
        user = None
        password = "newpassword"

        try:
            status = self.client.admin_set_password( user, password )

        except ParamError as exception:
            assert exception.code == -2
            assert exception.msg == "Username should be a string"

    def test_set_password_with_none_password(self):

        policy = {}
        user = "testsetpassworduser"
        password = None

        try:
            status = self.client.admin_set_password( user, password )

        except ParamError as exception:
            assert exception.code == -2
            assert exception.msg == "Password should be a string"

    def test_set_password_with_non_existent_user(self):

        policy = {}
        user = "new_user"
        password = "newpassword"

        try:
            status = self.client.admin_set_password( user, password, policy )

        except InvalidUser as exception:
            assert exception.code == 60
            assert exception.msg == "AEROSPIKE_INVALID_USER"

    def test_set_password_with_too_long_password(self):

        policy = {}
        user = "testsetpassworduser"
        password = "newpassword$" * 1000

        status = self.client.admin_set_password( user, password, policy )

        assert status == 0
