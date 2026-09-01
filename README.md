# Florence Media

Статический сайт на Jekyll, хостинг GitHub Pages.

## Как добавить место

1. Открой папку `_places`
2. Add file → Create new file
3. Имя файла: `nazvanie-mesta.md`
4. Вставь и заполни:

```
---
layout: place
title: "Название"
answer: "Одно предложение, 25-40 слов"
area: "San Frediano"
verified: "14 Sep 2026"
categories:
  - hide from the crowd
  - enjoy the view
---

Описание, 100-150 слов.
```

5. Commit changes. Через минуту место появится на сайте, во всех своих подборках и в sitemap.

`verified` оставляй пустым (`""`), пока не сходила.

## Как добавить подборку

Файл в папке `collections`, имя `moya-podborka.md`:

```
---
layout: collection
title: "Заголовок страницы"
category: "точное имя категории"
seo_title: "Заголовок для поисковика"
seo_description: "Описание 150-160 знаков"
answer: "Прямой ответ, 40-60 слов"
---

Свободный текст. Список мест подставится сам.
```

`category` должно совпадать с тем, что написано в `categories` у мест, буква в букву.

## Список категорий

nice cute places to eat at, places with an old soul, hide from the crowd,
enjoy the view, night heart of the city, pizza worth crossing town for,
real gelato, not the coloured stuff, eat like a local for under 10 euro,
drink wine somewhere real, see art without queueing, by the river,
do some outdoor activities, pools in the city, to do with kids,
modern cafes to work at, a bit out of the city

## Что менять в _config.yml

`author` — твоё имя, оно печатается в подвале.
