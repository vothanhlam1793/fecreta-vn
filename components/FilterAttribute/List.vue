<template>
    <b-card>
        <b-card-title>{{ list.name }}</b-card-title>
        <b-list-group>
            <b-list-group-item v-for="item in list.items" :key="item.slug">
                <b-form-checkbox v-model="selectedItems" :value="item.id">
                    {{ item.name }}
                </b-form-checkbox>
            </b-list-group-item>
        </b-list-group>
    </b-card>
</template>

<script>
export default {
    props: ['list'],
    watch: {
        selectedItems(n, o) {
            var sItems = this.list.items.map(item => {
                let exists = n.includes(item.id);
                if (exists) {
                    return {
                        status: true,
                        id: item.id
                    };
                } else {
                    return {
                        status: false,
                        id: item.id
                    };
                }
            });
            this.$emit("updateSelect", sItems);
        },
        list(n, o) {

        }
    },
    data() {
        return {
            selectedItems: []
        }
    },
    methods: {

    },
    created() {
        this.selectedItems = this.list.items.map(item => {
            return item.id;
        });
        // console.log(this.selectedItems);
    },
}
</script>