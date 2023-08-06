#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
{{ scaffold.name }} Service
"""
import stackhut

class Default(stackhut.Service):
    def add(self, x, y):
        return x + y

# export the services
SERVICES = {"Default": Default()}
