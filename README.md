![compare](https://github.com/note35/osu-map-viewer/blob/master/demo/demo.png)

### Viewer

View is a front-end map search engine.

1.Install

    npm install

2.Run

    npm run dev

Access:

    http://127.0.0.1:8080/

Instruction:

    Red:   update map information once only
    Green: update map information in each search


### Processor

Processor is an API for getting difficulty information of maps.

The purpose of processor is caching map information into local database. At first, the database is empty, each query of api will use crawler to fetch information from official website. For security consideration, by default, each page have 0.5 sec delay.

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

    Get all difficulty information of standard mode: 

    http://127.0.0.1:8000/api/332532/0

    Get all difficulty information of taiko mode: 

    http://127.0.0.1:8000/api/332532/1

    Get all difficulty information of ctb mode: 

    http://127.0.0.1:8000/api/332532/2

    Get all difficulty information of mania mode: 
  
    http://127.0.0.1:8000/api/332532/3

    Update difficulty information:

    http://127.0.0.1:8000/api/332532/1/1

### Docker

1.Build image

    $ docker build -t base .

2.Run image

    $ docker images -q
    <images id> <--
    ...
    ...
    $ docker run -p 8080:8080 -p 8000:8000 <images id> 

3.Run django on background

    [In the container]
    $ cd /srv/osu-map-viewer/processor
    $ python3.6 manage.py runserver 172.17.0.2:8000 &

4.Run nodejs on background

    [In the container]
    $ cd /srv/osu-map-viewer/viewer
    $ npm run dev &

5.Access from browser

    [MacOS: docker-machine ip]
    http://192.168.99.100:8080
