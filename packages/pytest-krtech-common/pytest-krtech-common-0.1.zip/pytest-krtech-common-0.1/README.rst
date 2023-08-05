pytest-krtech-common
--------------------

To configure a conftest.py do::

<pre>
    import pytest

    from configuration import ConftestOptions

    c = ConftestOptions()

    def pytest_addoption(parser):
        c.pytest_addoption(parser)

    @pytest.mark.tryfirst
    def pytest_runtest_makereport(item, call, __multicall__):
        return c.pytest_runtest_makereport(item, call, __multicall__)

    @pytest.yield_fixture(scope='module')
    def config(request):
        cnf = c.config(request)
        yield cnf
        cnf.driver.quit()
</pre>

To build a wheel package do::
<pre>
  cd pytest-krtech-common/
  python setup.py bdist_wheel
</pre>
Package should be available at::
  dist/pytest_krtech_common-0.1-py3-none-any.whl

To install from wheel do::
    pip install pytest_krtech_common-0.1-py3-none-any.whl
