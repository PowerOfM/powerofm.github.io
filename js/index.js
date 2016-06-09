/* Simple, jquery-based page control. */

/* global $ */

// namespace
var powerofm = {}

//name, css, logo, background, repoLink, readmeLink, siteLink, about
// 'https://fonts.googleapis.com/css?family=Comfortaa'
powerofm.Project = function (name, css, logo, background, repoLink, readmeLink, siteLink, about) {
  this.name = name
  this.css = css
  this.logo = logo
  this.background = background
  this.repoLink = repoLink
  this.readmeLink = readmeLink
  this.siteLink = siteLink
  this.about = about
}
powerofm.Project.prototype = {
  constructor: powerofm.Project,
  init: function (container) {
    // Inject CSS
    if (this.css) {
      var head = $('head')
      var css = this.css
      for (var i = 0; i < css.length; i++) {
        head.append('<link rel="stylesheet" type="text/css", href="' + css[i] + '" />')
      }
    }

    // Create element
    this.el = $('<div class="project" id="' + this.name + '"><div class="logo">' + this.logo + '</div><div class="info"><span>' + this.about + '</span><div class="links"><a class="link" href="' + this.siteLink + '">View</a><a class="link" href="' + this.readmeLink + '">Readme</a><a class="link" href="' + this.repoLink + '">Repo</a></div></div></div>')
    this.el.css('background-image', 'url("' + this.background + '")')
    container.append(this.el)

    this.logo = $('.project#' + this.name + ' .logo')
    this.info = $('.project#' + this.name + ' .info')
  },
  showInfo: function (show) {
    this.info['fade' + (show ? 'In' : 'Out')](300)
    this.logo['fade' + (show ? 'Out' : 'In')](300)
  }
}

powerofm.projects = { phased: new powerofm.Project(
                        'phased', ['https://fonts.googleapis.com/css?family=Comfortaa', 'projects/phased/style.css'], 'PHASED', 'projects/phased/background.png',
                        'https://github.com/powerofm/phased', 'http://powerofm.github.io/phased/readme.md', 'http://powerofm.github.io/phased',
                        'A portal-inspired first-person puzzle game where you control the direction of gravity. Created as a final project for CPSC314. Winner of the class\' <a href="http://www.ugrad.cs.ubc.ca/~cs314/Vjan2016/P4HOF/CS314_HOF_P4.html">Hall Of Fame</a>.'
                      )
                    }

powerofm.init = function () {
  powerofm.setupAbout()

  // Setup project tiles
  var projContainer = $('.projects')
  var projNames = Object.keys(powerofm.projects)
  for (var i = 0; i < projNames.length; i++) {
    powerofm.projects[projNames[i]].init(projContainer)
  }

  // Project switcher
  var pageTitle1 = $('#title1')
  var pageTitle2 = $('#title2')
  var pageProjBg = $('.project-background')
  projContainer.on('mouseenter', '.project', function (e) {
    var proj = powerofm.projects[$(this).attr('id')]
    if (!proj) return false

    pageTitle1.html('PROJECT:')
    pageTitle2.html(proj.name.toUpperCase())

    proj.showInfo(true)
    pageProjBg.css('background-image', 'url("' + proj.background + '")')
    pageProjBg.css('opacity', '1')
    return false
  })

  projContainer.on('mouseleave', '.project', function (e) {
    pageProjBg.css('opacity', '0')
    pageTitle1.html('OPEN SOURCE')
    pageTitle2.html('PROJECTS')

    for (var i = 0; i < projNames.length; i++) {
      powerofm.projects[projNames[i]].showInfo(false)
    }
  })
}

powerofm.setupAbout = function () {
  var dialogAbout = $('#dialogAbout')

  $('#navAbout').click(toggleDialog)
  dialogAbout.click(toggleDialog)

  function toggleDialog (e) {
    e.preventDefault()
    dialogAbout.toggle(500)    
  }
}

// Boot
$(function () { powerofm.init() })
