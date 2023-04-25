<template>
  <ElCard>
    <div slot="header">
      <h2>{{ title }}</h2>
    </div>
    <ElTimeline>
      <ElTimelineItem
        v-for="item in timelineData"
        :timestamp="item.date"
        placement="top"
        :key="item.key"
        center
      >
        <ElCard>
          <div class="timelineItem">
            <div class="timelineItem__text">
              <h4>{{ item.title }}</h4>
              <div>{{ item.description }}</div>
            </div>
            <div class="timelineItem__img">
              <img :src="item.resultImage" alt="无成果展示图片" />
            </div>
          </div>
        </ElCard>
      </ElTimelineItem>
    </ElTimeline>
  </ElCard>
</template>

<script>
export default {
  name: "timelineCard",
  props: ["timelineData", "title"],
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.el-card__body {
  overflow: scroll;
  max-height: 70vh;
}

.timelineItem {
  display: flex;
  justify-content: space-between;

  &__img {
    img {
      height: 25vh;
    }
  }
}
</style>
