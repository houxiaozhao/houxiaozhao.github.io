---
title: OpenEuler系统配置指南：Docker安装与GPU环境搭建
date: 2024-10-24 10:00:00.0
categories:
  - 操作系统
  - 容器技术
  - GPU计算
tags:
  - openEuler
  - docker
  - GPU
  - system configuration
  - container technology
  - NVIDIA drivers
  - Linux
keywords:
  - OpenEuler installation
  - Docker setup
  - GPU environment
  - system configuration
  - container deployment
  - NVIDIA GPU support
  - Linux operating system
  - enterprise-grade server
  - open source ecosystem
  - high-performance computing
description: |
  本文详细介绍了OpenEuler操作系统的安装配置过程，以及在其上部署Docker容器环境和配置GPU支持的完整步骤。文章涵盖了从系统安装、网络配置、软件源设置到Docker安装的各个环节，并特别关注了如何在OpenEuler系统中正确配置NVIDIA GPU驱动，以支持高性能计算和AI应用。适合系统管理员、开发人员以及对企业级Linux系统感兴趣的读者参考。

  This article provides a comprehensive guide on installing and configuring the OpenEuler operating system, as well as deploying a Docker container environment and setting up GPU support. It covers every step from system installation, network configuration, and software repository setup to Docker installation. Special attention is given to correctly configuring NVIDIA GPU drivers in the OpenEuler system to support high-performance computing and AI applications. This guide is suitable for system administrators, developers, and anyone interested in enterprise-grade Linux systems.

  OpenEuler作为一个开源的Linux发行版，专为企业级服务器和云计算环境设计，提供了卓越的性能、安全性和可靠性。本指南旨在帮助用户快速上手OpenEuler系统，并在其上构建一个功能强大的开发和部署环境。通过详细说明Docker的安装过程，我们展示了如何利用容器技术来简化应用部署和管理。此外，本文还深入探讨了如何在OpenEuler系统中配置GPU环境，为机器学习、深度学习等计算密集型任务提供必要的硬件加速支持。

  OpenEuler, as an open-source Linux distribution designed for enterprise servers and cloud computing environments, offers exceptional performance, security, and reliability. This guide aims to help users quickly get started with the OpenEuler system and build a powerful development and deployment environment on top of it. By detailing the Docker installation process, we demonstrate how to leverage container technology to simplify application deployment and management. Furthermore, this article delves into configuring the GPU environment in OpenEuler, providing necessary hardware acceleration support for compute-intensive tasks such as machine learning and deep learning.

  通过遵循本指南，读者将能够:
  1. 正确安装和配置OpenEuler操作系统
  2. 设置网络连接和软件源
  3. 在OpenEuler上安装和配置Docker
  4. 配置NVIDIA GPU驱动以支持高性能计算任务
  5. 了解OpenEuler生态系统和其在企业环境中的应用

  By following this guide, readers will be able to:
  1. Correctly install and configure the OpenEuler operating system
  2. Set up network connections and software repositories
  3. Install and configure Docker on OpenEuler
  4. Configure NVIDIA GPU drivers to support high-performance computing tasks
  5. Understand the OpenEuler ecosystem and its applications in enterprise environments

  本文内容基于最新的OpenEuler版本和Docker技术，确保读者能够获得最新、最实用的信息。无论您是初次接触OpenEuler，还是寻求在现有系统上优化Docker和GPU配置，本指南都将为您提供清晰、详细的操作步骤和最佳实践建议。

  This article is based on the latest versions of OpenEuler and Docker technology, ensuring that readers receive the most up-to-date and practical information. Whether you're new to OpenEuler or looking to optimize Docker and GPU configurations on existing systems, this guide will provide you with clear, detailed operational steps and best practice recommendations.
---

# 系统安装

## 制作启动盘https://www.iplaysoft.com/ventoy.html

## 安装系统

1.启动待安装的电脑/服务器。修改启动选项，进入 U 盘启动 2.选择要安装的系统。选择通用安装 3.然后从https://docs.openeuler.org/zh/docs/22.03_LTS_SP3/docs/Installation/%E5%AE%89%E8%A3%85%E6%8C%87%E5%AF%BC.html 的“安装引导界面”开始来进行安装配置

# 配置网络

> 参考 https://docs.openeuler.org/zh/docs/22.03_LTS_SP3/docs/Administration/%E9%85%8D%E7%BD%AE%E7%BD%91%E7%BB%9C.html

1.查看可用设备
nmcli dev status

2.配置动态 IP
nmcli connection add type ethernet con-name 连接名称 ifname 接口名称

3.激活配置
nmcli con up 连接名称

# 配置软件源

1.编辑 vi /etc/yum.repos.d/openEuler.repo

```ini
# 不通版本配置不同版本的源

[centos-extras]
name=Centos extras - $basearch
baseurl=https://mirrors.tuna.tsinghua.edu.cn/centos-vault/centos/8/extras/x86_64/os/
enabled=1
gpgcheck=0

[OS]
name=OS
baseurl=http://mirrors.tuna.tsinghua.edu.cn/openeuler/openEuler-20.03-LTS-SP3/OS/$basearch/
enabled=1
gpgcheck=1
gpgkey=http://mirrors.tuna.tsinghua.edu.cn/openeuler/openEuler-20.03-LTS-SP3/OS/$basearch/RPM-GPG-KEY-openEuler

[everything]
name=everything
baseurl=http://mirrors.tuna.tsinghua.edu.cn/openeuler/openEuler-20.03-LTS-SP3/everything/$basearch/
enabled=1
gpgcheck=1
gpgkey=http://mirrors.tuna.tsinghua.edu.cn/openeuler/openEuler-20.03-LTS-SP3/everything/$basearch/RPM-GPG-KEY-openEuler

[EPOL]
name=EPOL
baseurl=http://mirrors.tuna.tsinghua.edu.cn/openeuler/openEuler-20.03-LTS-SP3/EPOL/main/$basearch/
enabled=1
gpgcheck=1
gpgkey=http://mirrors.tuna.tsinghua.edu.cn/openeuler/openEuler-20.03-LTS-SP3/OS/$basearch/RPM-GPG-KEY-openEuler

[debuginfo]
name=debuginfo
baseurl=http://mirrors.tuna.tsinghua.edu.cn/openeuler/openEuler-20.03-LTS-SP3/debuginfo/$basearch/
enabled=1
gpgcheck=1
gpgkey=http://mirrors.tuna.tsinghua.edu.cn/openeuler/openEuler-20.03-LTS-SP3/debuginfo/$basearch/RPM-GPG-KEY-openEuler

[source]
name=source
baseurl=http://mirrors.tuna.tsinghua.edu.cn/openeuler/openEuler-20.03-LTS-SP3/source/
enabled=1
gpgcheck=1
gpgkey=http://mirrors.tuna.tsinghua.edu.cn/openeuler/openEuler-20.03-LTS-SP3/source/RPM-GPG-KEY-openEuler

[update]
name=update
baseurl=http://mirrors.tuna.tsinghua.edu.cn/openeuler/openEuler-20.03-LTS-SP3/update/$basearch/
enabled=1
gpgcheck=1
gpgkey=http://mirrors.tuna.tsinghua.edu.cn/openeuler/openEuler-20.03-LTS-SP3/OS/$basearch/RPM-GPG-KEY-openEuler

[update-source]
name=update-source
baseurl=http://mirrors.tuna.tsinghua.edu.cn/openeuler/openEuler-20.03-LTS-SP3/update/source/
enabled=1
gpgcheck=1
gpgkey=http://mirrors.tuna.tsinghua.edu.cn/openeuler/openEuler-20.03-LTS-SP3/source/RPM-GPG-KEY-openEuler
```

2.更新本地软件列表

```bash
dnf list all
```

# 安装 SSH Server

```bash
dnf install openssh-server
systemctl enable sshd
systemctl start sshd
# 修改配置
vi /etc/ssh/sshd_config
# 以下配置取消注释，设为 yes
# AllowAgentForwarding yes
# AllowTcpForwarding yes
# GatewayPorts yes
# 重启 sshd
systemctl restart sshd
```

# 安装 docker

```bash
# 关闭防火墙
systemctl stop firewalld && systemctl disable firewalld
# 禁用 SELinux
sed -i 's/^SELINUX=enforcing/SELINUX=disabled/' /etc/selinux/config
# 配置软件源,内容在下一部分
vi /etc/yum.repos.d/docker-ce.repo
# 安装一些软件
dnf install dnf-plugins-core slirp4netns fuse-overlayfs container-selinux -y

# 如果提示
#  Error: Transaction test error:
#  file /usr/lib64/libasm.so.1 from install of elfutils-libs-0.190-3.oe2403.x86_64 conflicts with file from package elfutils-0.185-18.oe2203sp4.x86_64
#  file /usr/lib64/libdw.so.1 from install of elfutils-libs-0.190-3.oe2403.x86_64 conflicts with file from package elfutils-0.185-18.oe2203sp4.x86_64
# 运行这个 sudo yum swap elfutils-0.185-18.oe2203sp4.x86_64 elfutils-libs-0.190-3.oe2403.x86_64
# 安装docker
yum install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y
# 安装nvidia-container-toolkit 如果遇到网络问题 可以手动编辑/etc/yum.repos.d/nvidia-container-toolkit.repo
curl -s -L https://nvidia.github.io/libnvidia-container/stable/rpm/nvidia-container-toolkit.repo |   sudo tee /etc/yum.repos.d/nvidia-container-toolkit.repo
# 如果下载错误，需要使用代理，请替换为自己的ip
# export https_proxy=http://192.168.31.127:7890 http_proxy=http://192.168.31.127:7890 all_proxy=socks5://192.168.31.127:7890
dnf install nvidia-container-toolkit nvidia-docker2 -y
# 修改配置,内容在下边
vi /etc/docker/daemon.json
# 重启docker
systemctl daemon-reload
systemctl restart docker
```

```ini
# /etc/yum.repos.d/docker-ce.repo
# 不通版本配置不同版本的源
[docker-ce-stable]
name=Docker CE Stable - $basearch
baseurl=https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/centos/8/$basearch/stable
enabled=1
gpgcheck=1
gpgkey=https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/centos/gpg

[docker-ce-stable-debuginfo]
name=Docker CE Stable - Debuginfo $basearch
baseurl=https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/centos/8/debug-$basearch/stable
enabled=0
gpgcheck=1
gpgkey=https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/centos/gpg

[docker-ce-stable-source]
name=Docker CE Stable - Sources
baseurl=https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/centos/8/source/stable
enabled=0
gpgcheck=1
gpgkey=https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/centos/gpg

[docker-ce-test]
name=Docker CE Test - $basearch
baseurl=https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/centos/8/$basearch/test
enabled=0
gpgcheck=1
gpgkey=https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/centos/gpg

[docker-ce-test-debuginfo]
name=Docker CE Test - Debuginfo $basearch
baseurl=https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/centos/8/debug-$basearch/test
enabled=0
gpgcheck=1
gpgkey=https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/centos/gpg

[docker-ce-test-source]
name=Docker CE Test - Sources
baseurl=https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/centos/8/source/test
enabled=0
gpgcheck=1
gpgkey=https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/centos/gpg

[docker-ce-nightly]
name=Docker CE Nightly - $basearch
baseurl=https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/centos/8/$basearch/nightly
enabled=0
gpgcheck=1
gpgkey=https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/centos/gpg

[docker-ce-nightly-debuginfo]
name=Docker CE Nightly - Debuginfo $basearch
baseurl=https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/centos/8/debug-$basearch/nightly
enabled=0
gpgcheck=1
gpgkey=https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/centos/gpg

[docker-ce-nightly-source]
name=Docker CE Nightly - Sources
baseurl=https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/centos/8/source/nightly
enabled=0
gpgcheck=1
gpgkey=https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/centos/gpg
```

```json
# /etc/docker/daemon.json
{
  "data-root": "/data/docker",
  "registry-mirrors": ["https://docker.1panel.dev"],
  "default-runtime": "nvidia",
  "runtimes": {
    "nvidia": {
      "path": "nvidia-container-runtime",
      "runtimeArgs": []
    }
  },
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  },
  "storage-driver": "overlay2",
  "exec-opts": ["native.cgroupdriver=systemd"]
}
```

```ini
# /etc/yum.repos.d/nvidia-container-toolkit.repo
[nvidia-container-toolkit]
name=nvidia-container-toolkit
baseurl=https://nvidia.github.io/libnvidia-container/stable/rpm/$basearch
repo_gpgcheck=1
gpgcheck=0
enabled=1
gpgkey=https://nvidia.github.io/libnvidia-container/gpgkey
sslverify=1
sslcacert=/etc/pki/tls/certs/ca-bundle.crt

[nvidia-container-toolkit-experimental]
name=nvidia-container-toolkit-experimental
baseurl=https://nvidia.github.io/libnvidia-container/experimental/rpm/$basearch
repo_gpgcheck=1
gpgcheck=0
enabled=0
gpgkey=https://nvidia.github.io/libnvidia-container/gpgkey
sslverify=1
sslcacert=/etc/pki/tls/certs/ca-bundle.crt

```
