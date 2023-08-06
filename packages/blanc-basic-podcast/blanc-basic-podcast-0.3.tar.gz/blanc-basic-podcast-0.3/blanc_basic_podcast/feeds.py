import mimetypes

from django.conf import settings
from django.contrib.sites.models import Site
from django.contrib.staticfiles.storage import staticfiles_storage
from django.contrib.syndication.views import add_domain
from django.core.urlresolvers import reverse
from django.utils import timezone

from .itunesfeed import PodcastFeed
from .models import PodcastFile


class BasicPodcastFeed(PodcastFeed):
    title = getattr(settings, 'PODCAST_TITLE', 'Podcast')

    author_name = settings.PODCAST_AUTHOR
    author_email = settings.PODCAST_EMAIL

    itunes_explicit = getattr(settings, 'PODCAST_EXPLICIT', 'no')
    itunes_categories = settings.PODCAST_CATEGORIES
    itunes_summary = getattr(settings, 'PODCAST_SUMMARY', None)

    item_guid_is_permalink = False

    def link(self):
        if getattr(settings, 'PODCAST_PAGES', True):
            return reverse('blanc_basic_podcast:file-list')
        else:
            # We assume the home page has some meaningful content
            return '/'

    @property
    def itunes_image(self):
        file_url = staticfiles_storage.url(settings.PODCAST_IMAGE)
        domain = Site.objects.get_current().domain
        return add_domain(domain=domain, url=file_url)

    def items(self):
        feed_limit = getattr(settings, 'PODCAST_FEED_LIMIT', 10)
        return PodcastFile.objects.filter(published=True, date__lte=timezone.now())[:feed_limit]

    def item_description(self, obj):
        return obj.description

    def item_pubdate(self, obj):
        return obj.date

    def item_guid(self, obj):
        return '%s:podcast:%d' % (Site.objects.get_current().domain, obj.pk)

    def item_enclosure_url(self, obj):
        file_url = obj.file.url
        domain = Site.objects.get_current().domain
        return add_domain(domain=domain, url=file_url)

    def item_enclosure_mime_type(self, obj):
        return mimetypes.guess_type(obj.file.name)[0]

    def item_enclosure_length(self, obj):
        return obj.file_size

    def item_itunes_duration(self, obj):
        return obj.time_duration
