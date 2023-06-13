# createdin.moscow
Агрегратор аренды креативных площадок города Москвы, объединяющий арендаторов  и арендодателей


# Подготовка к запуску и запуск проекта

Скачать и установить Python по ссылке:
```
https://www.python.org/downloads/
```

Находясь в папке с проектом, создать и активировать виртуальное окружение:

```
python -m venv env
```

```
source venv/scripts/activate
```

```
python -m pip install --upgrade pip
```

Установить зависимости из файла requirements.txt:

```
pip install -r requirements.txt
```

Перейти в основную папку и выполнить миграции:

```
cd foodgram
```

Выполнить миграцию:

```
python manage.py migrate
```

Запустить проект:

```
python manage.py runserver
```