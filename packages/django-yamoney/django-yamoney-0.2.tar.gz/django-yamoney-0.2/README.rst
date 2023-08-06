=====
Yamoney
=====

Django приложение для приема денег на кошелек Yandex.Money

Установка
-----------

1. Добавить "yamoney" в ваш INSTALLED_APPS::

    INSTALLED_APPS = (
        ...
        'yamoney',
    )

2. Добавить yamoney URLconf в urls.py вашего проекта::

    url(r'^yamoney/', include('yamoney.urls'))

3. Создать форму оплаты с помощью yamoney.forms.paymentform_factory::

    payment_form = paymentform_factory(
        u'Оплата участия',  # описание платежа
        2000,               # сумма
        'event-15'          # метка, чтобы в последствии привязать платеж к конкретному event
    )

4. Слушать post_save сигнал модели yamoney.Transaction на создание новой transaction.

