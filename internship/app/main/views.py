from . import main
from flask import render_template, session, request, redirect, url_for, abort, current_app, flash
from flask_login import login_user, logout_user, login_required, current_user
from .stepik_auth import StepicAgent, stepic_oauth
from .models import Teacher, Student, Course


# вход (через Stepik)
@main.route('/login/', methods = ['GET', 'POST'])
def login():
    return stepic_oauth.authorize(callback=url_for('.authorized', _external=True))


# выход
@main.route('/logout/', methods = ['GET'])
@login_required
def logout():
    logout_user()
    return redirect(url_for('.index'))


# авторизация
@main.route('/authorized/', methods = ['GET', 'POST'])
def authorized():
    if request.args.get('code') is None:
        abort(404)

    response = stepic_oauth.authorized_response()
    token = response['access_token']
    session['token'] = token
    stepic_agent = StepicAgent(token)
    name, avatar_url, stepic_id = stepic_agent.get_profile_info()

    teacher = Teacher.objects(stepic_id = stepic_id).first()
    if teacher is None:
        return redirect(url_for('.index'))
    else:
        teacher.name = name
        teacher.avatar_url = avatar_url
        teacher.save()
        login_user(teacher)
        return redirect(url_for('.show_all_courses'))


# главная
@main.route('/', methods=['GET'])
def index():
    if current_user.is_authenticated:
        return redirect(url_for('.show_all_courses'))
    else:
        return render_template("main/index.html")


# список курсов
@main.route('/courses/', methods=['GET'])
@login_required
def show_all_courses():
    return render_template("main/courses.html")
