from django.utils.six.moves.urllib.parse import urlparse
from django.http import HttpResponseRedirect
from django.core.urlresolvers import resolve, Resolver404


class ModelAdminMiddleware(object):
    """
    Whenever loading wagtail's wagtailadmin_explore url, we check the session
    for a 'return_to_list_url' value (set by some views), to see if the user
    should be redirected to a custom list view instead, and if so, redirect
    them to it.
    """

    def process_request(self, request):
        referer_url = request.META.get('HTTP_REFERER')
        return_to_index_url = request.session.get('return_to_index_url')

        try:
            resolver_match = resolve(request.path)

            if all((
                resolver_match.url_name == 'wagtailadmin_explore',
                return_to_index_url,
                referer_url)
            ):

                referer_match = resolve(urlparse(referer_url).path)
                referer_name = referer_match.url_name
                referer_ns = referer_match.namespace

                if any((
                    referer_ns == 'wagtailadmin_pages' and referer_name in (
                        'add', 'edit', 'delete', 'unpublish', 'copy'
                    ),
                    not referer_ns and referer_name in (
                        'wagtailadmin_pages_create',
                        'wagtailadmin_pages_edit',
                        'wagtailadmin_pages_delete',
                        'wagtailadmin_pages_unpublish',
                    ),
                )):
                    del request.session['return_to_index_url']
                    return HttpResponseRedirect(return_to_index_url)

        except Resolver404:
            pass

        return None
