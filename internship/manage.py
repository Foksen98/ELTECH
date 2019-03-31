from flask_script import Manager
from app import create_app

from app.main.models import Teacher

app = create_app()
manager = Manager(app)


@manager.option('-stepic_id')
def new_teacher(stepic_id):
    try:
        teacher = Teacher(stepic_id=stepic_id, name='', avatar_url='')
        teacher.save()
        print("Новый преподаватель добавлен")
    except Exception as e:
        print(e)


if __name__ == '__main__':
    manager.run()
