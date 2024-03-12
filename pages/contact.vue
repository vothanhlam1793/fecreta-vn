<template>
    <b-row> 
        <b-col>
            <GmapMap
                :center="{lat:contact.data.attributes.lat, lng:contact.data.attributes.long}"
                :zoom="contact.data.attributes.zoom"
                map-type-id="terrain"
                style="width: 100%; height: 300px"
            >
            <GmapMarker
                :position="markerPosition"
                :draggable="true"
                @dragend="updateMarkerPosition"
            />
            </GmapMap>
        </b-col>
        <b-col>
            <div v-html="contact.data.attributes.description">

            </div>
        </b-col>
    </b-row>
</template>

<script>
import gql from 'graphql-tag';
export default {
    mounted(){
        this.controlNotify();
    },
    updated(){
        // this.markerPosition = {
        //     lat: this.contact.data.attributes.lat,
        //     lng: this.contact.data.attributes.lng,
        // };
        // this.center = {
        //     lat: this.contact.data.attributes.lat,
        //     lng: this.contact.data.attributes.lng,
        // }
    },
    data() {
        return {
            center: { lat: 10.7886908, lng: 106.6487455 }, // Tọa độ trung tâm (San Francisco, CA)
            zoom: 13,
            markerPosition: { lat: 10.7886908, lng: 106.6487455 }, // Tọa độ mặc định cho marker
        };
    },
    methods: {
        placeMarker(event) {
            // Xử lý sự kiện click trên bản đồ để đặt marker vào vị trí được click
            this.markerPosition = {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
            };
        },
        updateMarkerPosition(event) {
            // Xử lý sự kiện khi marker được thả và cập nhật vị trí mới của nó
            this.markerPosition = {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
            };
        },
        controlNotify(){
            this.$nuxt.$emit('enableNofifyChanged', this.contact.data.attributes.enableNotify);
        }
    },
    apollo: {
        contact: {
            query: gql`
            query Contact {
                contact {
                    data {
                        attributes {
                            lat
                            long
                            title
                            titleMap
                            enableNotify
                            zoom
                            description
                        }
                    }
                }
            }
            `
        }
    }
}
</script>