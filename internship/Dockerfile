FROM python:3.7-stretch
WORKDIR /usr/internship
COPY requirements.txt .
RUN pip3 install -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["python3", "manage.py", "runserver", "-h", "0.0.0.0", "-p", "5000"]
