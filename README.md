### Processor

1.Virtualenv

    virtualenv -p /usr/local/bin/python3.5 env
    . env/bin/activate

2.Install requirement

    cd processor
    pip install -r requirement.txt

3.DB setup

    python manage.py makemigrations
    python manage.py migrate

4.Runserver

    python manage.py runserver

API:

    For example: https://osu.ppy.sh/s/332532

    Get all difficult information of standard mode: 

    http://127.0.0.1:8000/api/332532/0

    Get all difficult information of taiko mode: 

    http://127.0.0.1:8000/api/332532/1

    Get all difficult information of ctb mode: 

    http://127.0.0.1:8000/api/332532/2

    Get all difficult information of mania mode: 
  
    http://127.0.0.1:8000/api/332532/3
