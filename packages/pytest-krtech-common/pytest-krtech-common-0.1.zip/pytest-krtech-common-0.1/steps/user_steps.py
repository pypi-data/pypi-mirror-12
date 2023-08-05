# coding=utf-8
from time import sleep

import allure
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support.wait import WebDriverWait
from hamcrest import assert_that, equal_to, is_, not_none, none, contains_string
import selenium.webdriver.support.expected_conditions as ec

class UserSteps(object):
    def __init__(self, config):
        self.config = config
        self.driver = config.driver
        self.element_wait = config.element_wait
        self.mysqlhost = config.mysqlhost

    @allure.step("Открывает страницу '{1}'")
    def opens(self, url):
        self.driver.get(str(url))

    @allure.step("Проверяет наличие элемента '{1}' на странице")
    def should_see_element(self, element):
        assert_that(element.element, not_none(), u'Элемент отсутствует на странице ' + self.driver.current_url)

    @allure.step("Проверяет отсутствие элемента '{1}' на странице")
    def should_not_see_element(self, element):
        assert_that(element.element, none(), u'Элемент присутствует на странице ' + self.driver.current_url)

    @allure.step("Ожидает исчезновение элемента '{1}'")
    def waits_for_element_disappeared(self, element):
        try:
            WebDriverWait(self.driver, self.element_wait).until_not(
                lambda s: self.driver.find_element(element.by, element.locator).is_displayed())
        except TimeoutException:
            assert_that(not TimeoutException, u'Элемент не должен присутствовать в верстке страницы '
                        + self.driver.current_url)

    @allure.step("Ожидает появление элемента '{1}'")
    def waits_for_element_displayed(self, element):
        try:
            WebDriverWait(self.driver, self.element_wait).until(
                lambda s: self.driver.find_element(element.by, element.locator).is_displayed())
            return element
        except TimeoutException:
            assert_that(not TimeoutException, u'Элемент не отображается на странице '
                        + self.driver.current_url)

    @allure.step("Текст элемента '{1}' соответствует '{2}'")
    def should_see_element_contains_text(self, element, text):
        assert_that(element.element.text.find(text) > 0,
                    u'Текст не соответствует ожидаемому значению')

    @allure.step("Текст ошибки '{1}' соответствует '{2}'")
    def should_see_field_error_text(self, input_, text):
        try:
            WebDriverWait(self.driver, self.element_wait)\
                .until(lambda x: input_.error).is_displayed()
        except TimeoutException:
            assert_that(False, u'Поле не отмечено как содержащее ошибку')

        assert_that(input_.error.text, contains_string(str(text)),
                    u'Текст ошибки не соответствует ожидаемому значению')

    @allure.step("Значение в поле '{1}' соответствует '{2}'")
    def should_see_field_value(self, input_, value):
        assert_that(input_.value, equal_to(str(value)),
                    u'Значение в поле не соответствует ожидаемому')

    @allure.step("Список '{1}' содержит '{2}' элементов")
    def should_see_list_size(self, multipleelement, size):
        assert_that(len(multipleelement.elements), is_(size), u'Список не содержит ожидаемое количество элементов')

    @allure.step("Нажимает элемент '{1}'")
    def clicks(self, element):
        try:
            e = WebDriverWait(self.driver, self.element_wait)\
                .until(ec.element_to_be_clickable((element.by, element.locator)))
            e.click()
        except TimeoutException:
            assert_that(element.element, not (is_(None)), u'Невозможно нажать на элемент на странице '
                        + self.driver.current_url)

    @allure.step("Выбирает значение '{2}' из списка '{1}'")
    def selects_by_text(self, select, value):
        select.select.select_by_visible_text(value)

    @allure.step("Выбирает пункт '{2}' из списка '{2}'")
    def selects_from_list(self, list_, text):
        print(list_.get_element_by_text(text).element.text)

    @allure.step("Ожидает '{1}' секунд(ы)")
    def waits_for(self, timeout=3):
        sleep(timeout)

    @allure.step("Вводит текст '{2}' в '{1}'")
    def enters_text(self, input_, text):
        input_.input.clear()
        input_.input.send_keys(text)

    @allure.step("Вводит текст '{2}' в '{1}'")
    def appends_text(self, input_, text):
        input_.input.send_keys(text)

    @allure.step("Ожидает завершения AJAX запроса")
    def waits_for_ajax(self):
        try:
            WebDriverWait(self.driver, self.element_wait).until(
                lambda s: s.execute_script('return $.active == 0'))
        except TimeoutException:
            assert_that(not TimeoutException, u'Истекло время ожидания AJAX запроса %s секунд'
                        % str(self.element_wait))
