from flask_script import Manager
from app import create_app

from app.main.models import Teacher

app = create_app()
manager = Manager(app)

@manager.command
def add_base_teacher():
    try:
        teacher = Teacher(stepic_id='19764358',
                          name='Константин Фокин',
                          avatar_url='https://stepik.org/users/19764358/af0acaa2dacd7a7004958c54e12ab05838ad22ab/avatar.svg')
        teacher.save()
        print("Базовый преподаватель добавлен")
    except Exception as e:
        print(e)


if __name__ == '__main__':
    manager.run()
