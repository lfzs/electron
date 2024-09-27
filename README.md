渲染进程全部会打包到一起

主进程和预加载进程只会打包 devDependencies（如果主进程和预加载都使用包，如 axios，则会打包两份）

不会打包 dependencies（出现一份，但是可能更大，因为复制原始内容（node_module））