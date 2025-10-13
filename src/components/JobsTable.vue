<template>
  <div class="jobs-table">
    <div v-if="jsEnabled" class="jobs-table__toolbar">
      <div class="search-input">
        <InputText placeholder="Search..." />
        <slot name="searchIcon" />
      </div>
      <MultiSelect
        v-model="selectedDepartments"
        :options="departments"
        placeholder="All departments"
        :show-toggle-all="false"
      />
      <MultiSelect
        v-model="selectedWorkmodels"
        :options="['Pre-con', 'On-site', 'Hybrid']"
        placeholder="All work models"
        :show-toggle-all="false"
      />
      <span>{{ resultsCount }} results</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { InputText, MultiSelect } from 'primevue'
import { useMounted } from '@vueuse/core'

import staffRoles from '../data/hr/staff_roles.json'

const departments = [...new Set(staffRoles.map((r) => r.department))]

const selectedWorkmodels = defineModel<string[]>('workModels')
const selectedDepartments = defineModel<string[]>('departments')

const resultsCount = staffRoles.length

const jsEnabled = useMounted()
</script>

<style lang="scss">
@use '../styles/charter';
@use '../styles/text-styles';

.jobs-table {
  display: flex;
  align-items: stretch;
  align-self: stretch;
  flex-direction: column;

  margin-top: 64px;

  &__toolbar {
    display: flex;
    flex-direction: row;
    gap: 40px;
    color: charter.$neutrals600;

    > * {
      flex: 1;
    }

    > span {
      align-self: center;
      text-align: right;
      max-width: 100px;
    }

    [data-pc-name='multiselect'] {
      display: flex;
      cursor: pointer;
      align-items: center;
      border-bottom: solid 1px charter.$primary400;
      user-select: none;

      [data-pc-section='labelcontainer'] {
        padding: 16px 0;
      }

      [data-pc-section='dropdown'] {
        margin-left: auto;
      }
    }

    .search-input {
      position: relative;
      display: flex;
      flex-direction: row;
      > input {
        flex: 1;
        background: 0;
        border: 0;
        @include text-styles.paragraphMediumRegular;
        padding: 16px 32px 16px 0;
        outline: 0;

        border-bottom: solid 1px charter.$primary400;
      }

      svg {
        font-size: 20px;
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: -10px;
      }
    }
  }
}

[data-pc-section='list'] {
  list-style: none;
  background: charter.$neutrals100;
  box-shadow:
    0 4px 8px 0 rgba(0, 0, 0, 0.14),
    0 0 2px 0 rgba(0, 0, 0, 0.12);

  border-radius: 0 0 5px 5px;
  overflow: hidden;

  > li {
    display: flex;
    gap: 8px;
    padding: 8px 16px 8px 32px;
    cursor: pointer;
    user-select: none;

    transition: background-color ease-out 0.2s;

    @include text-styles.paragraphMediumRegular;

    &:hover {
      background-color: charter.$neutrals200;
    }

    &[aria-selected='true'] {
      background-color: charter.$primary100;
      color: charter.$primary500;
    }

    [data-pc-name='pcoptioncheckbox'] {
      position: absolute;
      display: flex;
      align-items: center;
      left: 8px;

      input {
        display: none;
      }
    }
  }
}
</style>
