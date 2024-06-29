<template>
    <div>
        <List v-for="list of lists" :list="list" :key="list.slug" @updateSelect="updateSelect"></List>
    </div>
</template>

<script>
import List from "./List.vue"
export default {
    props: ["attributes"],
    watch: {
        attributes(n, o) {
            var that = this;
            that.lists = [];
            that.sItems = [];
            var groupSlugLists = {};

            Object.values(n).forEach(item => {
                if (!groupSlugLists[item.groupSlug]) {
                    groupSlugLists[item.groupSlug] = {};
                    groupSlugLists[item.groupSlug].name = item.groupName;
                    groupSlugLists[item.groupSlug].slug = item.groupSlug;
                    groupSlugLists[item.groupSlug].items = [];
                }
                groupSlugLists[item.groupSlug].items.push(item);
                that.sItems.push({
                    status: true,
                    id: item.id
                })
            });

            Object.values(groupSlugLists).forEach(list => {
                that.lists.push(list);
            });
            console.log(this.sItems);
        }
    },
    data() {
        return {
            lists: [],
            sItems: []
        }
    },
    components: {
        List,
    },
    methods: {
        updateSelect(items) {
            var that = this;
            items.forEach(newItem => {
                const index = that.sItems.findIndex(originalItem => originalItem.id === newItem.id);
                if (index !== -1) {
                    that.sItems[index].status = newItem.status;
                }
            });
            this.$emit("updateSelect", this.sItems);
        }
    }
}
</script>