#= require active_admin/base

ready = ->
	$(".polyselect").on "change", ->
    $('.polyform').hide()
    $('#' + $(@).val() + '_poly').show()

	$('.polyform').first().parent('form').on "submit", (e) ->
    $('.polyform').each (index, element) =>
      $e = $(element)
      if $e.css('display') != 'block'
        $e.remove()

	$('#' + $(".polyselect").val() + '_poly').show()
$(document).ready(ready)
$(document).on('page:load', ready)
