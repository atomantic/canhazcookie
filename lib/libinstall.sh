#!/usr/bin/env bash

###
# some bash install helpers
# @author Adam Eivy
###
function require_cask() {
    running "brew cask $1"
    which $1 > /dev/null 2>&1 | true
    if [[ ${PIPESTATUS[0]} != 0 ]]; then
        brew cask list $1 > /dev/null 2>&1 | true
        if [[ ${PIPESTATUS[0]} != 0 ]]; then
            action "brew cask install $1 $2"
            brew cask install $1
            if [[ $? != 0 ]]; then
                error "failed to install $1! aborting..."
                exit -1
            fi
        fi
    fi
    ok
}

function require_brew() {
    running "brew $1 $2"
    brew list $1 > /dev/null 2>&1 | true
    if [[ ${PIPESTATUS[0]} != 0 ]]; then
        action "brew install $1 $2"
        brew install $1 $2
        if [[ $? != 0 ]]; then
            error "failed to install $1! aborting..."
            exit -1
        fi
    fi
    ok
}


function install_homebrew() {
    running "checking homebrew"
    brew_bin=$(which brew) 2>&1 > /dev/null
    if [[ $? != 0 ]]; then
        action "installing homebrew"
        ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"
        if [[ $? != 0 ]]; then
            error "unable to install homebrew, script $0 abort!"
            exit -1
        fi
    fi
    ok
}

function install_brewcask() {
    running "checking brew-cask"
    output=$(brew tap | grep cask)
    if [[ $? != 0 ]]; then
        action "installing brew-cask"
        require_brew caskroom/cask/brew-cask
    fi
    ok
}

