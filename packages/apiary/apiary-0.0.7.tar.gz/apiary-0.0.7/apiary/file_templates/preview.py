<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{{ title }}</title>
</head>
<body>
<script src="https://api.apiary.io/seeds/embed.js"></script>
<script>
    var embed = new Apiary.Embed({
        apiBlueprint: "{{ magic }}"
    });
</script>
</body>
</html>