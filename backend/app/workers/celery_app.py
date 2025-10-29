from celery import Celery
from celery.schedules import crontab
from app.core.config import settings

celery_app = Celery(
    "autoforge",
    broker=settings.REDIS_URL,
    backend=settings.REDIS_URL,
    include=["app.workers.tasks"]
)

celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
    task_track_started=True,
    task_time_limit=300,  # 5 minutes max per task
    worker_prefetch_multiplier=1,
)

# Scheduled tasks configuration
celery_app.conf.beat_schedule = {
    'check-scheduled-chains': {
        'task': 'app.workers.tasks.check_scheduled_chains',
        'schedule': 60.0,  # Run every minute
    },
}
