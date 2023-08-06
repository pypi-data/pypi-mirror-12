from __future__ import unicode_literals
from django_cradmin.viewhelpers.listbuilder import base
from builtins import str


class FocusBox(base.ItemValueRenderer):
    """
    Renders a value item as a box styled with the cradmin focus bg as background.

    This is a good default when setting up the structure of views,
    but you will most likely want to create your own
    :class:`django_cradmin.viewhelpers.listbuilder.base.ItemValueRenderer`
    subclass for more than the most simple use cases.
    """

    def get_base_css_classes_list(self):
        css_classes = super(FocusBox, self).get_base_css_classes_list()
        css_classes.append('django-cradmin-listbuilder-itemvalue-focusbox')
        return css_classes


class EditDelete(FocusBox):
    """
    Extends :class:`.FocusBox` with a template that makes it very easy
    to render a box that provides edit and delete buttons.

    The renderer also allows you to specify a description,
    and the template has lots of blocks that makes it easy to insert
    more content or override the existing content.
    """

    #: The template used to render this itemvalue.
    #: The template has lots of blocks that you can override.
    template_name = 'django_cradmin/viewhelpers/listbuilder/itemvalue/edit-delete.django.html'

    def get_base_css_classes_list(self):
        """
        Adds the ``django-cradmin-listbuilder-itemvalue-titleeditdelete`` css class
        in addition to the classes added by the superclasses.
        """
        css_classes = super(EditDelete, self).get_base_css_classes_list()
        css_classes.append('django-cradmin-listbuilder-itemvalue-editdelete')
        return css_classes

    def get_title(self):
        """
        Get the title of the box.

        Defaults to ``str(self.value)``.
        """
        return str(self.value)

    def get_description(self):
        """
        Get the description (shown below the title).

        Defaults to ``None``, which means that no description
        is rendered.
        """
        return None

    def get_edit_viewname(self):
        """
        Get the viewname within the current :class:`django_cradmin.crapp.App`
        to go to when editing. The view is called with ``self.value.id`` as
        argument. If you want to change this behavior, override the
        ``editbutton-url`` template block.

        This returns ``"edit"`` by default, and we recommend that you
        name the view for editing items this to keep things uniformly
        structured.
        """
        return 'edit'

    def get_delete_viewname(self):
        """
        Get the viewname within the current :class:`django_cradmin.crapp.App`
        to go to when deleting. The view is called with ``self.value.id`` as
        argument. If you want to change this behavior, override the
        ``deletebutton-url`` template block.

        This returns ``"delete"`` by default, and we recommend that you
        name the view for deleting items this to keep things uniformly
        structured.
        """
        return 'delete'

    def get_view_viewname(self):
        """
        Get the viewname within the current :class:`django_cradmin.crapp.App`
        to go to when viewing. The view is called with ``self.value.id`` as
        argument. If you want to change this behavior, override the
        ``viewbutton-url`` template block.

        This returns ``None`` by default, and we recommend that you
        name the view for viewing items this to keep things uniformly
        structured.
        """
        return None


class EditDeleteWithViewMixin(object):
    """
    Mixin class for :class:`.EditDelete` that adds a view button that
    shows a preview via the view named ``"view"`` in the current app
    (the viewname can be overridden in :meth:`.EditDeleteWithViewMixin.get_viewname`).

    Examples:

        Add a view button to :class:`.EditDelete`::

            class EditDeleteWithView(EditDeleteWithViewMixin, EditDelete):
                pass

        .. note::

            The example above is the same as using :class:`.EditDeleteWithViewMixin`.
    """
    def get_view_viewname(self):
        """
        Overrides :meth:`.EditDelete.get_view_viewname` to make it return
        ``"view"`` by default instead of ``None``.
        """
        return 'view'


class EditDeleteWithView(EditDeleteWithViewMixin, EditDelete):
    """
    Shortcut for subclassing :class:`EditDeleteWithViewMixin`
    and :class:`.EditDelete`.
    """


class EditDeleteWithArchiveImage(EditDelete):
    """
    Extends :class:`.EditDelete` to include an image from cradmin imagearchive.

    Uses a template that extends the template in :class:`.EditDelete`.
    """

    #: The template used to render this itemvalue.
    #: The template has lots of blocks that you can override.
    template_name = 'django_cradmin/viewhelpers/listbuilder/itemvalue/edit-delete-with-archive-image.django.html'

    def get_archiveimage(self):
        """
        Get a :class:`django_cradmin.apps.cradmin_imagearchive.models.ArchiveImage`
        object to use as the image.
        """
        raise NotImplementedError()

    def get_imagetype(self):
        """
        Get the ``imagetype`` to use to scale/format the image.

        See :func:`django_cradmin.templatetags.cradmin_image_tags.cradmin_create_archiveimage_tag`
        for more information on ``imagetype``.

        Defaults to ``"listbuilder-itemvalue-editdelete"``.
        """
        return "listbuilder-itemvalue-editdelete"

    def get_image_fallbackoptions(self):
        """
        Get the ``fallbackoptions`` to use to scale/format the image.
        These options are used when the imagetype returned by
        :meth:`.get_imagetype` is not defined in the
        :setting:`DJANGO_CRADMIN_IMAGEUTILS_IMAGETYPE_MAP` setting.

        See :func:`django_cradmin.templatetags.cradmin_image_tags.cradmin_create_archiveimage_tag`
        for more information on ``fallbackoptions``.

        Defaults to::

            {
                'width': 330,
                'height': 400,
                'crop': 'limit',
                'quality': 70,
            }
        """
        return {
            'width': 330,
            'height': 400,
            'crop': 'limit',
            'quality': 70,
        }


class EditDeleteWithArchiveImageAndView(EditDeleteWithViewMixin, EditDeleteWithArchiveImage):
    """
    Shortcut for subclassing :class:`EditDeleteWithViewMixin`
    and :class:`.EditDeleteWithArchiveImage`.
    """
