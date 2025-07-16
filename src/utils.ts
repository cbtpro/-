// Copyright 2023 Peter Chen
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const bucket = new WeakMap();

const reactive = (data: any) => {
  const obj = new Proxy(data, {
    get(target, key) {
      if (!activeEffect) {
        return target[key];
      }
      let depsMap = bucket.get(target);
      if (!depsMap) {
        bucket.set(target, (depsMap = new Map()));
      }
      let deps = depsMap.get(key);
      if (!deps) {
        depsMap.set(key, (deps = new Set()));
      }
      deps.add(activeEffect);
      return target[key];
    },
    set(target, key, newValue) {
      target[key] = newValue;
      const depsMap = bucket.get(target);
      if (!depsMap) {
        return true;
      }
      const effects = depsMap.get(key);
      effects && effects.forEach(fn => fn());
      return true;
    },
  })
  return obj;
}

let activeEffect: Function;
const effect = (fn: Function) => {
  activeEffect = fn;
  fn();
}