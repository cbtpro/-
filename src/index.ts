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

interface VNode {
  tag: string | Function;
  props?: Record<string, any>;
  children?: string | VNode[];
}
const MyComponent = () => {
  return {
    tag: 'div',
    props: {
      onClick: () => console.log('hello'),
    },
    children: '点击我',
  };
}

const vnode: VNode = {
  tag: MyComponent,
}

const renderer = (vnode: VNode, container: HTMLElement) => {
  if (typeof vnode.tag === 'string') {
    mountElement(vnode, container);
  } else if (typeof vnode.tag === 'function') {
    mountComponent(vnode, container);
  }
}

const mountElement = (vnode: VNode, container: HTMLElement) => {

  if (typeof vnode.tag === 'string') {
    const el = document.createElement(vnode.tag);

    for (const key in vnode.props) {
      if (/^on/.test(key)) {
        el.addEventListener(
          key.substring(2).toLowerCase(),
          vnode.props[key],
        );
      }
    }

    if (typeof vnode.children === 'string') {
      const childrenEl = document.createTextNode(vnode.children);
      el.appendChild(childrenEl);
    } else if (Array.isArray(vnode.children)) {
      vnode.children.forEach(child => renderer(child, el));
    }

    container.appendChild(el);
  }
}

const mountComponent = (vnode: VNode, container: HTMLElement) => {
  if (typeof vnode.tag === 'function') {
    const subtree = vnode.tag();
    renderer(subtree, container);
  }
}

renderer(vnode, document.body);