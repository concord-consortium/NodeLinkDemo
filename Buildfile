# ==========================================================================
# Project:   Nodelink
# Copyright: @2011 Concord Consortium
# ==========================================================================

config :all, :required => :sproutcore

# No incantation like:
#
#   config :raphael_views, :required => :raphael
#
# inside RaphaelViews' own Buildfile seems to work, so we include the dependency of RaphaelViews on Raphael here. 
# I don't know why this is.

config 'raphael_views/raphael_views', :required => 'raphael_views/raphael'
