<template>
    <div
        class="row"
        v-if="showNotify && enablePage"
    >
        <div class="col">
            <b-alert
                variant="warning"
                show
                v-if="notifies != undefined"
            >
                <div class="running-text">
                    <p class="p-0 m-0">
                        <span
                            v-for="(notify, index) in notifies.data"
                            :key="notify.id"
                            class="custom-text"
                            @mouseover="hoverEffect(true, index)"
                            @mouseout="hoverEffect(false, index)"
                            @click="handleClick(index)"
                            :style="{ color: isHovered[index] ? '#ff0000' : 'inherit', cursor: 'pointer' }"
                        >
                            {{ notify.attributes.content }}
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </span>
                    </p>
                </div>
            </b-alert>
            <div v-else></div>

        </div>
    </div>
</template>
<script>
import gql from 'graphql-tag';
export default {
    created(){
        var that = this;
        this.$nuxt.$on('enableNofifyChanged', (enableNotify) => {
            that.enablePage = enableNotify;
        });
    },
    data() {
        return {
            enablePage: true, // Cai nay danh cho page dieu khien notify
            showNotify: false,
            isHovered: [false],

        }
    },
    methods: {
        hoverEffect(value, index) {
            this.isHovered = [...this.isHovered.slice(0, index), value, ...this.isHovered.slice(index + 1)];
        },
        handleClick(groupNumber) {
            // Xử lý logic khi click vào span
            console.log(`Clicked on group ${groupNumber}`);
        },
    },
    watch: {
        setup(n, o) {
            if (n.data.attributes.enable_notify) {
                this.showNotify = true;
            } else {
                this.showNotify = false;
            }
        }
    },
    apollo: {
        setup: {
            query: gql`
            query Setup {
                setup {
                    data {
                    attributes {
                        enable_notify
                    }
                    }
                }
            }
            `
        },
        notifies: {
            query: gql`
            query {
            notifies (filters: {
                    enable: {
                        eq: true
                    },
                    start: {
                        lte: "${(new Date()).toISOString()}"
                    },
                    end: {
                        gte: "${(new Date()).toISOString()}"
                    }
                }) {
                data {
                attributes {
                    content
                    end
                    publishedAt
                    start
                    title
                    enable
                }
                }
            }
            }
            `
        }
    }
}
</script>
<style>
.running-text {
    white-space: nowrap;
    overflow: hidden;
    display: inline-block;
    width: 100%;
}

.running-text p {
    animation: running-text 30s linear infinite;
    display: inline-block;
    /* Fix for inline elements inside inline-block */
    width: 100%;
}

@keyframes running-text {
    0% {
        transform: translateX(100%);
    }

    100% {
        transform: translateX(-100%);
    }
}

.custom-text {
    /* color: inherit !important; */
    color: inherit;
}
</style>