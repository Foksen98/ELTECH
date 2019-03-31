from .. import db
from .. import login_manager
from flask_login import UserMixin


class Teacher(UserMixin, db.Document):
	_id = db.ObjectIdField()
	stepic_id = db.StringField()
	name = db.StringField()
	avatar_url = db.StringField()

	def get_id(self):
		return str(self._id)


class Student(db.Document):
	_id = db.ObjectIdField()
	stepic_id = db.StringField()
	name = db.StringField()
	avatar_url = db.StringField()


class Course(db.Document):
	_id = db.ObjectIdField()
	course_id = db.StringField()
	name = db.StringField()
	description = db.StringField()
	teacher = db.StringField()
	score = db.StringField()


@login_manager.user_loader
def load_user(user_id):
	try:
		return Teacher.objects(_id = user_id).first()
	except:
		return None
