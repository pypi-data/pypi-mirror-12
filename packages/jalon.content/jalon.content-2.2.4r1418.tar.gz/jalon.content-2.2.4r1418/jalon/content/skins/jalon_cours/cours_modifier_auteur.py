##bind container=container
##bind context=context
##bind namespace=
##bind script=script
##bind subpath=traverse_subpath
##parameters=
##title=
##

context.setAuteur(context.REQUEST.form)
context.REQUEST.RESPONSE.redirect(context.absolute_url())
