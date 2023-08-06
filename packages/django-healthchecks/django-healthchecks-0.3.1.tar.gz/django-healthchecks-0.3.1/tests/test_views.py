import json
from django.http import Http404

import pytest

from django_healthchecks import views


def test_index_view(rf, settings):
    settings.HEALTH_CHECKS = {
        'database': 'django_healthchecks.contrib.check_dummy_true',
        'redis': 'django_healthchecks.contrib.check_dummy_false',
    }

    request = rf.get('/')
    view = views.HealthCheckView()
    result = view.dispatch(request)

    data = json.loads(result.content)
    assert data == {
        'database': True,
        'redis': False,
    }


def test_service_view(rf, settings):
    settings.HEALTH_CHECKS = {
        'database': 'django_healthchecks.contrib.check_dummy_true'
    }

    request = rf.get('/')
    view = views.HealthCheckServiceView()
    result = view.dispatch(request, service='database')

    assert result.status_code == 200
    assert result.content == 'true'


def test_service_view_err(rf, settings):
    settings.HEALTH_CHECKS = {
        'database': 'django_healthchecks.contrib.check_dummy_false'
    }

    request = rf.get('/')
    view = views.HealthCheckServiceView()

    result = view.dispatch(request, service='database')
    assert result.status_code == 200
    assert result.content == 'false'


def test_service_view_404(rf):
    request = rf.get('/')
    view = views.HealthCheckServiceView()

    with pytest.raises(Http404):
        view.dispatch(request, service='database')
