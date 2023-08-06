# labit

## 工作原理


worker 节点上的工作进程
front 前端上的处理队列

push 添加任务

context 持久化的上下文, 记录当前的参数, 以及运行到的位置和状态.

传递的信息:

用参数更新context, 传递json
put({context:context, module_name:module_name})

task:
  name: the module_name

  args:
    各种变量, 参数. 平铺
    arg1:
    arg2:


  context:
    包括记录当前运行状态的量, 用于恢复的时候处理.
    running_file: path to file
    running_job: path to job
    state: done/running


每运行完, 就会改变context, context会刷新args
context会保存下来, 可以恢复进度


run成功需要返回True或者其他真值



push task.yml-> deal_with_line(push compute) -> compute worker

单体的函数, compute, conformer, 执行该执行的功能
ensemble的函数, 针对ensemble进行分发, 针对ensemble进行统计












Commands:
  backup    backup all data to backup folder
  restore   restore all data from backup folder

  startdb   start mongodb and redis-server
  rest      start the rest api server
  start     ensure all service are running, start rest and server

  front     start the server to deal with task
  worker    start a worker to do the compute

  push      push a task to the tasks queue

  runner    run a task locally
