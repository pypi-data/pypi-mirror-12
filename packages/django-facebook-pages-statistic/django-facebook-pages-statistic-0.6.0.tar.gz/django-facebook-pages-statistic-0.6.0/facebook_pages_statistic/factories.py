# -*- coding: utf-8 -*-
'''
Copyright 2011-2015 ramusus
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
'''
import random

import factory
from django.utils import timezone

from facebook_pages.factories import PageFactory

from .models import PageStatistic


class PageStatisticFactory(factory.DjangoModelFactory):
    FACTORY_FOR = PageStatistic

    page = factory.SubFactory(PageFactory)
    likes_count = factory.LazyAttribute(lambda o: random.randint(0, 10000))
    talking_about_count = factory.LazyAttribute(lambda o: random.randint(0, 10000))
    updated_at = factory.LazyAttribute(lambda o: timezone.now())
