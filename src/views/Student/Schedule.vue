<template>
    <el-calendar class="calendar">
        <template #dateCell="{ data }">
            <p :class="data.isSelected ? 'is-selected' : ''">
            <div v-if="data.date.getDate() == 11">
                <div class="class-list">
                    <div v-for="(course,index) in courses3"
                    :style="{backgroundColor:colorLists[0][index]}"
                    >{{course}}</div>
                </div>
            </div>
            <div v-else-if="data.date.getDate()==8">
                <div class="class-list">
                     <div v-for="(course,index) in courses1"
                    :style="{backgroundColor:colorLists[2][index]}"
                    >{{course}}</div>
                </div>
            </div>
            <div v-else-if="data.date.getDate() == 22">
                <div class="class-list">
                    <div v-for="(course,index) in courses2"
                    :style="{backgroundColor:colorLists[1][index]}"
                    >{{course}}</div>
                </div>
            </div>
            <div v-else>
                {{ data.date.getDate() }}
            </div>
            </p>
        </template>
    </el-calendar>
</template>

<script lang="ts" setup>
let dayWithClass = [3, 5, 8, 20]

let colorLists = [['#1989fa', '#e53e3e', '#667eea'],[ '#38b2ac', '#667eea'],['#ed64a6','#1989fa']]
let courses1=['计算机组成原理','计组项目']
let courses2=['java','马克思主义原理']
let courses3=['算法设计与分析','通信原理']

</script>

<style  lang="scss" scoped>
$colorlist1: #1989fa,
#e53e3e,
#667eea;
$colorlist2: #667eea,
#e53e3e,
#1989fa;

.is-selected {
    color: #1989fa;
}

.class-list {
    div {
        border-radius: 5%;
        color: white;
        margin-top: 4%;
        padding-left: 1%;
    }
}

@for $i from 1 through 3 {
    .calendar:nth-child(#{$i}) {
        @for $i from 1 through 3 {
            .class-list {

                /*use the mixin to generate a random background color*/
                div:nth-of-type(#{$i}) {
                    background-color: nth($colorlist1, $i);
                }
            }
        }
    }
}
</style>
