=====
OTP SMS
=====

Django приложение для аутентификации через SMS

Установка
-----------

1. Добавить "otp_sms" в ваш INSTALLED_APPS::

    INSTALLED_APPS = (
        ...
        'otp_sms',
    )

3. Добавить бекенд otp_sms.backends.SMSBackend в ваш AUTHENTICATION_BACKENDS::

    AUTHENTICATION_BACKENDS = (
        ...
        'otp_sms.backends.SMSBackend',
    )

3. Использовать форму otp_sms.forms.OTPSMSAuthenticationForm для аутентификации пользователей::

