<template>
  <div class="jobs-table">
    <div class="jobs-table__toolbar" :class="{ jsEnabled }">
      <div class="search-input">
        <InputText placeholder="Search..." v-model.trim="search" />
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
      <span>{{ searchResults.length }} results</span>
    </div>
    <table>
      <thead>
        <tr>
          <th>Department</th>
          <th>Role</th>
          <th>Work Model</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="role in searchResults" :key="role.id">
          <td>{{ role.department }}</td>
          <td>{{ role.name }}</td>
          <td>{{ role.workmodel }}</td>
          <td>
            <div class="jobs-table__status-container">
              <span :class="{ open: role.open }">{{
                role.open ? 'Open for applications' : 'Closed for applications'
              }}</span>
              <a :href="'/staff-volunteering/' + getPageId(role)"><ChevronRightIcon /></a>
            </div>
          </td>
        </tr>
        <tr v-if="searchResults.length === 0">
          <td colspan="4" class="empty">No results</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
import { InputText, MultiSelect } from 'primevue'
import ChevronRightIcon from '@primevue/icons/chevronright'
import { useMounted } from '@vueuse/core'

import staffRoles from '../data/hr/staff_roles.json'
import { getPageId } from '../data/hr/staff_roles.ts'
import { ref, computed } from 'vue'

const departments = [...new Set(staffRoles.map((r) => r.department))]

const selectedWorkmodels = ref<string[]>([])
const selectedDepartments = ref<string[]>([])
const search = ref('')

const searchResults = computed(() => {
  let results = staffRoles
  if (search.value) {
    const searchItems = search.value.toLowerCase().split(' ')
    results = results.filter((r) =>
      searchItems.every(
        (s) =>
          r.department.toLowerCase().includes(s) ||
          r.name.toLowerCase().includes(s) ||
          r.workmodel.toLowerCase().includes(s)
      )
    )
  }

  if (selectedWorkmodels.value.length > 0) {
    results = results.filter((r) => selectedWorkmodels.value.includes(r.workmodel))
  }
  if (selectedDepartments.value.length > 0) {
    results = results.filter((r) => selectedDepartments.value.includes(r.department))
  }
  return results
})

const jsEnabled = useMounted()
</script>

<style lang="scss">
@use '../styles/charter';
@use '../styles/text-styles';

.jobs-table {
  display: flex;
  align-items: stretch;
  align-self: center;
  flex-direction: column;

  margin-top: 64px;
  max-width: 1100px;
  width: 100%;

  &__toolbar {
    display: flex;
    flex-direction: row;
    gap: 40px;
    color: charter.$neutrals600;
    visibility: hidden;
    height: 60px;

    &.jsEnabled {
      visibility: visible;
    }

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

  > table {
    margin-top: 32px;
    border-radius: 8px;
    overflow: hidden;
    border: solid 1px charter.$primary500;
    border-spacing: 0;
    table-layout: fixed;

    thead {
      background: charter.$primary500;

      th {
        padding: 24px 22px;
        text-align: left;
        color: charter.$neutrals100;

        &:first-child {
          width: 200px;
        }

        &:last-child {
          width: 200px;
        }

        &:nth-child(3) {
          width: 150px;
        }
      }
    }

    tbody {
      tr {
        position: relative;

        background: charter.$neutrals100;
        transition: 0.2s ease-out background-color;

        &:hover {
          background: charter.$neutrals300;
        }

        & + tr td {
          border-top: solid 1px charter.$primary500;
        }

        a::after {
          content: '';
          position: absolute;
          inset: 0;
        }
      }
      td {
        padding: 24px 22px;
        text-align: left;

        &:first-child {
          @include text-styles.display3SemiBold;
        }

        &.empty {
          text-align: center;
          color: charter.$neutrals600;
          background: charter.$neutrals300;
        }
      }
    }
    .jobs-table__status-container {
      display: flex;
      flex-direction: row;
      align-items: center;

      span {
        display: inline-block;
        text-align: center;
        margin-right: 10px;
        padding: 5px;
        width: 182px;
        border-radius: 3px;

        background: charter.$secondary100;
        @include text-styles.display2SemiBold;

        &.open {
          background: charter.$primary100;
        }
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
      background-color: charter.$neutrals300;
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
