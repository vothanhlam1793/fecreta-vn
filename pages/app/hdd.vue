<template>
    <div class="container mt-5">
      <b-form>
        <b-form-group label="Số lượng camera" label-for="cameraCount">
          <b-form-input
            id="cameraCount"
            v-model="cameraCount"
            type="number"
            required
            @change="calculateStorage"
          ></b-form-input>
        </b-form-group>
  
        <b-form-group label="Độ phân giải (MP)" label-for="resolution">
          <b-form-select
            id="resolution"
            v-model="resolution"
            :options="resolutionOptions"
            required
            @change="calculateStorage"
          ></b-form-select>
        </b-form-group>
  
        <b-form-group label="Tỷ lệ khung hình (fps)" label-for="frameRate">
          <b-form-input
            id="frameRate"
            v-model="frameRate"
            type="number"
            required
            @change="calculateStorage"
          ></b-form-input>
        </b-form-group>
  
        <b-form-group label="Thời gian lưu trữ (ngày)" label-for="storageDays">
          <b-form-input
            id="storageDays"
            v-model="storageDays"
            type="number"
            required
            @change="calculateStorage"
          ></b-form-input>
        </b-form-group>
  
        <b-form-group label="Chuẩn nén video" label-for="compression">
          <b-form-select
            id="compression"
            v-model="compression"
            :options="compressionOptions"
            required
            @change="calculateStorage"
          ></b-form-select>
        </b-form-group>
  
        <b-form-group label="Chất lượng ảnh" label-for="imageQuality">
          <b-form-select
            id="imageQuality"
            v-model="imageQuality"
            :options="imageQualityOptions"
            required
            @change="calculateStorage"
          ></b-form-select>
        </b-form-group>
  
        <b-form-group label="Thời gian chuyển động (giờ/ngày)" label-for="motionTime">
          <b-form-input
            id="motionTime"
            v-model="motionTime"
            type="number"
            required
            @change="calculateStorage"
          ></b-form-input>
        </b-form-group>
  
        <b-button @click="calculateStorage" variant="primary">Tính toán</b-button>
      </b-form>
  
      <div v-if="storage !== null" class="mt-3">
        <b-alert show variant="success">
          Dung lượng ổ cứng cần thiết: {{ storage }} GB
        </b-alert>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        cameraCount: 1,
        resolution: '1MP',
        frameRate: 25,
        storageDays: 7,
        compression: 'H.264',
        imageQuality: 'High',
        motionTime: 12, // Giá trị mặc định cho thời gian chuyển động là 2 giờ/ngày
        storage: null,
        resolutionOptions: ['1MP', '2MP', '4MP', '5MP', '8MP'],
        compressionOptions: [
          { value: 'H.264', text: 'H.264' },
          { value: 'H.265', text: 'H.265' },
          { value: 'MJPEG', text: 'MJPEG' },
        ],
        imageQualityOptions: ['Low', 'Medium', 'High'],
      };
    },
    mounted(){
        this.calculateStorage();
    },
    methods: {
      calculateStorage() {
        let compressionFactor;
        switch (this.compression) {
          case 'H.264':
            compressionFactor = 1;
            break;
          case 'H.265':
            compressionFactor = 0.5;
            break;
          case 'MJPEG':
            compressionFactor = 5;
            break;
        }
  
        let resolutionMP = parseInt(this.resolution);
        if (isNaN(resolutionMP)) {
          resolutionMP = parseInt(this.resolution.replace('MP', ''));
        }
  
        // Đánh giá chất lượng ảnh
        let imageQualityFactor;
        switch (this.imageQuality) {
          case 'Low':
            imageQualityFactor = 0.5;
            break;
          case 'Medium':
            imageQualityFactor = 1;
            break;
          case 'High':
            imageQualityFactor = 1.5;
            break;
        }
  
        // Tính toán dung lượng theo thời gian chuyển động
        const motionFactor = this.motionTime / 24; // Chuyển đổi sang tỷ lệ giờ/ngày
  
        const bitrate = resolutionMP * this.frameRate * 0.1 * compressionFactor * imageQualityFactor * motionFactor;
        const storagePerCamera = (bitrate * 3600 * 24 * this.storageDays) / (8 * 1024); // GB
        this.storage = (this.cameraCount * storagePerCamera).toFixed(2);
      },
    },
  };
  </script>
  
  <style>
  /* Thêm CSS tùy chỉnh ở đây nếu cần */
  </style>
  