FROM python:3.7-stretch
WORKDIR /usr/dolgistop_mail_sender
COPY requirements.txt .
RUN pip3 install -r requirements.txt
COPY . .
EXPOSE 5000
ENV APP_SETTINGS="config.ProdConfig"
CMD ["python3", "manage.py", "runserver", "-h", "0.0.0.0", "-p", "5000"]
