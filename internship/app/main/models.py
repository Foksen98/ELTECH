from .. import db
from .. import login_manager
from flask_login import UserMixin
# import datetime


class Teacher(UserMixin, db.Document):
	stepic_id = db.StringField()
	name = db.StringField()
	avatar_url = db.StringField()


class Student(db.Document):
	stepic_id = db.StringField()
	name = db.StringField()
	avatar_url = db.StringField()


class Course(db.Document):
    course_id = db.StringField()
    name = db.StringField()
    description = db.StringField()
    teacher = db.StringField()
    score = db.StringField()


@login_manager.user_loader
def load_user(id):
    return Teacher.objects(_id=id).first()
