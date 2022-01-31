<template>
    <div class="mb-3 pointer p-2 entry-container" @click="$router.push({name:'entry', params:{id:10}})">
        <div class="entry-title d-flex">
            <span class="text-success fs-5 fw-bold">29</span>
            <span class="mx-1 fs-5">Enero</span>
            <span class="mx-2 fw-light">2022, Sabado</span>
        </div>
        <div class="entry-description">
            Lorem nulla deserunt laborum laboris ut irure occaecat sunt aliqua nostrud ad reprehenderit. Sint culpa cupidatat cupidatat occaecat ea cupidatat amet aute aliqua laborum do eu. Labore ex aliqua Lorem velit.
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .entry-container{
        border-bottom: solid 1px #2c3e50;
        transition: .2s all ease-in;

        &:hover{
            background: lighten($color: grey, $amount: 45);
        }

        .entry-description{
            font-size: 12px;
        }
    }
</style>