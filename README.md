# Facebook secret santa app
A simple Facebook based secret santa app

## API

```
POST /🎅

{
  "santas": [ "Rhian", "Lewis", "Zoe", "Beth" ]
}
```

And get...

```
{
  "Lewis": "Zoe",
  "Rhian": "Lewis",
  "Beth": "Rhian",
  "Zoe": "Beth"
}
```
