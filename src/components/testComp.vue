<template>
    <div>
        {{greeting + " I am " + character}}
    </div>
</template>

<script>
export default
{
    name: "my-compname",
    data: function()
    {
        return {
            greeting: "Hello"
        }
    },
    props: ["character"]
}
</script>